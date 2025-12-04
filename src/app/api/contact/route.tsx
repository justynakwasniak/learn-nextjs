import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  console.log("Dostałem dane:", data);

 
  return NextResponse.json({ message: "Formularz odebrany pomyślnie!" });
}
