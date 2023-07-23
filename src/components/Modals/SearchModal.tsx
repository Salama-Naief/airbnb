"use client";

import React, { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { onClose } from "@/redux/hooks/useSearchSlice";
import Heading from "../Utils/Heading";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import CounterInput from "../inputs/CounterInput";
import { useRouter, useSearchParams } from "next/navigation";
import Calender from "../inputs/Calender";
import { Range } from "react-date-range";
import { LocationType } from "@/types";
import queryString from "query-string";
import { formatISO } from "date-fns";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}
const SearchModal = () => {
  const useSearch = useAppSelector((state) => state.useSearch);
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useSearchParams();
  const [currentStep, setCurrentStep] = useState(STEPS.LOCATION);

  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [guestCount, setGuestCounte] = useState<number>(1);
  const [roomCount, setRoomCount] = useState<number>(1);
  const [bathroomCount, setBathroomCount] = useState<number>(1);
  const [location, setLocation] = useState<LocationType | undefined>(undefined);

  const Map = useMemo(
    () =>
      dynamic(() => import("../Utils/Map"), {
        ssr: false,
      }),
    [location]
  );

  //hande next action
  const onNext = () => {
    if (currentStep === STEPS.INFO) return null;
    setCurrentStep((val) => val + 1);
  };

  //handle back steps action
  const onBack = () => {
    if (currentStep === STEPS.LOCATION) return null;
    setCurrentStep((val) => val - 1);
  };

  //handle submite
  const handleSubmit = async () => {
    if (currentStep !== STEPS.INFO) {
      //validate steps
      return onNext();
    }

    let currentQuery: any = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery = {
      ...currentQuery,
      guestCount,
      roomCount,
      bathroomCount,
      locationValue: location?.value,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    dispatch(onClose());
    setCurrentStep(STEPS.LOCATION);
    router.push(url);
  };

  const handleClose = useCallback(() => {
    dispatch(onClose());
  }, [dispatch]);

  const actionLabel = useMemo(() => {
    if (currentStep === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [currentStep]);

  const secondaryActionLabel = useMemo(() => {
    if (currentStep === STEPS.LOCATION) {
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
        title="Where is your place located?"
        subtitle="Help guests find you!"
      />
      <CountrySelect value={location} onClick={(val) => setLocation(val)} />
      <Map center={location?.latlng} />
    </div>
  );

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
            value={guestCount}
            onDecrease={() => setDecrease(guestCount, setGuestCounte)}
            onIncrease={() => setIncrease(guestCount, setGuestCounte)}
          />
          <hr />
          <CounterInput
            title="Rooms"
            subTitle="How many rooms do you have?"
            value={roomCount}
            onDecrease={() => setDecrease(roomCount, setRoomCount)}
            onIncrease={() => setIncrease(roomCount, setRoomCount)}
          />
          <hr />
          <CounterInput
            title="Bathrooms"
            subTitle="How many bathrooms do you have?"
            value={bathroomCount}
            onDecrease={() => setDecrease(bathroomCount, setBathroomCount)}
            onIncrease={() => setIncrease(bathroomCount, setBathroomCount)}
          />
        </div>
      </div>
    );
  }

  if (currentStep === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Calender
          onChange={(val) => setDateRange(val.selection)}
          range={dateRange}
        />
      </div>
    );
  }

  return (
    <div
      className={`${
        useSearch.isOpen ? "opacity-100 block" : "opacity-0 hidden"
      } transtion-all duration-300`}
    >
      <Modal
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        isOpen={useSearch.isOpen}
        onClose={handleClose}
        title="Airbnb your home!"
        onSubmit={handleSubmit}
        disabled={false}
        secondaryAction={() => onBack()}
        body={bodyContent}
      />
    </div>
  );
};

export default SearchModal;
