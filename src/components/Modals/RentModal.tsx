"use client";

import React, { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import {
  addLocation,
  addRentCounters,
  addRentPrice,
  addRentTextValues,
  setRent,
} from "@/redux/hooks/rentSlice";
import { onClose } from "@/redux/hooks/useRentSlice";
import { categories } from "@/utils/consts/categories.const";
import CategoryIngput from "../inputs/CategoryIngput";
import Heading from "../Utils/Heading";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import CounterInput from "../inputs/CounterInput";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}
const RentModal = () => {
  const useRent = useAppSelector((state) => state.useRent);
  const rent = useAppSelector((state) => state.rent);
  const dispatch = useDispatch();
  const router = useRouter();
  const [guestCount, setGuestCounte] = useState<number>(1);
  const [roomCount, setRoomCount] = useState<number>(1);
  const [bathroomCount, setBathroomCount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(STEPS.CATEGORY);

  const Map = useMemo(
    () =>
      dynamic(() => import("../Utils/Map"), {
        ssr: false,
      }),
    [rent.location]
  );

  //hande next action
  const onNext = () => {
    if (currentStep === STEPS.PRICE) return null;
    setCurrentStep((val) => val + 1);
  };

  //handle back steps action
  const onBack = () => {
    if (currentStep === STEPS.CATEGORY) return null;
    setCurrentStep((val) => val - 1);
  };

  //handle submite
  const handleSubmit = async () => {
    if (currentStep !== STEPS.PRICE) {
      //validate steps
      if (currentStep === STEPS.CATEGORY && !rent.category) {
        toast.error("choose category,please.");
        return null;
      }
      if (currentStep === STEPS.LOCATION && !rent.location) {
        toast.error("choose your Location,please.");
        return null;
      }
      if (currentStep === STEPS.IMAGES && !rent.imageSrc) {
        toast.error("choose image,please.");
        return null;
      }
      if (
        currentStep === STEPS.DESCRIPTION &&
        (!rent.description || !rent.title)
      ) {
        toast.error("enter title and description,please.");
        return null;
      }
      return onNext();
    }
    setIsLoading(true);

    try {
      let data: any = null;
      if (rent.type === "create") {
        data = await axios.post("/api/listings", rent);
      } else if (rent.type === "update" && rent.listingId) {
        data = await axios.put(`/api/listings/${rent.listingId}`, rent);
      }

      console.log("data", data.data);
      if (data?.data.status === "success") {
        toast.success(data.data.message);
        dispatch(
          setRent({
            category: "",
            location: undefined,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: "",
            price: 1,
            title: "",
            description: "",
            type: "create",
            listingId: "",
          })
        );
        dispatch(onClose());
        setCurrentStep(STEPS.CATEGORY);
        router.refresh();
      }
      if (data?.data.status === "error") {
        data.data.errors.map((e: any) => {
          toast.error(e.message);
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.error("errr", error);
      toast.error("some thing went wrong,please try again!");
      setIsLoading(false);
    }
  };

  const handleClose = useCallback(() => {
    dispatch(onClose());
  }, [dispatch]);

  const actionLabel = useMemo(() => {
    if (currentStep === STEPS.PRICE) {
      return rent.type === "update" ? "Update" : "Create";
    }

    return "Next";
  }, [currentStep]);

  const secondaryActionLabel = useMemo(() => {
    if (currentStep === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [currentStep]);

  const setDecrease = (val: number, setValue: Function) => {
    if (val <= 1) return;
    setValue(val - 1);
  };

  const setIncrease = (val: number, setValue: Function) => {
    setValue(val + 1);
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div
        className="
        mt-4
      grid 
      md:grid-cols-2 
      gap-4
      max-h-[45vh]
      pr-4
      overflow-y-auto
      overflow-x-hidden
      "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryIngput
              icon={item.icon}
              label={item.label}
              selected={rent.category === item.label}
              onClick={(val) =>
                dispatch(addRentTextValues({ name: "category", value: val }))
              }
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (currentStep === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={rent.location}
          onClick={(val) => dispatch(addLocation(val))}
        />
        <Map center={rent.location?.latlng} />
      </div>
    );
  }

  if (currentStep === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />
        <div>
          <CounterInput
            title="Guests"
            subTitle="How many guests do you allow?"
            value={rent.guestCount}
            onDecrease={() =>
              dispatch(
                addRentCounters({ name: "guestCount", type: "decrease" })
              )
            }
            onIncrease={() =>
              dispatch(
                addRentCounters({ name: "guestCount", type: "increase" })
              )
            }
          />
          <hr />
          <CounterInput
            title="Rooms"
            subTitle="How many rooms do you have?"
            value={rent.roomCount}
            onDecrease={() =>
              dispatch(addRentCounters({ name: "roomCount", type: "decrease" }))
            }
            onIncrease={() =>
              dispatch(addRentCounters({ name: "roomCount", type: "increase" }))
            }
          />
          <hr />
          <CounterInput
            title="Bathrooms"
            subTitle="How many bathrooms do you have?"
            value={rent.bathroomCount}
            onDecrease={() =>
              dispatch(
                addRentCounters({ name: "bathroomCount", type: "decrease" })
              )
            }
            onIncrease={() =>
              dispatch(
                addRentCounters({ name: "bathroomCount", type: "increase" })
              )
            }
          />
        </div>
      </div>
    );
  }

  if (currentStep === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          value={rent.imageSrc}
          onChange={(val) =>
            dispatch(addRentTextValues({ name: "imageSrc", value: val }))
          }
        />
      </div>
    );
  }

  if (currentStep === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          name="title"
          type="text"
          value={rent.title}
          error={!rent.title ? "title is requird" : undefined}
          handleChange={(val) =>
            dispatch(
              addRentTextValues({ name: "title", value: val.target.value })
            )
          }
          disabled={false}
        />
        <Input
          id="discrition"
          label="Description"
          name="discrition"
          type="text"
          value={rent.description}
          error={!rent.description ? "discrition is requird" : undefined}
          handleChange={(val) =>
            dispatch(
              addRentTextValues({
                name: "description",
                value: val.target.value,
              })
            )
          }
          disabled={false}
        />
      </div>
    );
  }
  if (currentStep === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />

        <Input
          id="price"
          label="Price"
          name="price"
          formatPrice
          type="number"
          value={rent.price}
          error={!rent.price ? "price is requird" : undefined}
          handleChange={(val) => dispatch(addRentPrice(val.target.value))}
          disabled={false}
        />
      </div>
    );
  }

  return (
    <div
      className={`${
        useRent.isOpen ? "opacity-100 block" : "opacity-0 hidden"
      } transtion-all duration-300`}
    >
      <Modal
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        isOpen={useRent.isOpen}
        onClose={handleClose}
        title="Airbnb your home!"
        isLoading={isLoading}
        onSubmit={handleSubmit}
        disabled={isLoading}
        secondaryAction={() => onBack()}
        body={bodyContent}
      />
    </div>
  );
};

export default RentModal;
