import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = request.json();
  const { paramsToSign } = await body;
  try {
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    );
    return NextResponse.json({
      signature,
    });
  } catch (error) {
    return NextResponse.json({
      message: error,
    });
  }
}
