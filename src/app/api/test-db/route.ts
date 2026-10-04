import { getDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await getDatabase();

    await db.command({ ping: 1 });

    return NextResponse.json({
      success: true,
      message: "MongoDB connection successful!",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "MongoDB connection failed!",
      },
      { status: 500 }
    );
  }
}