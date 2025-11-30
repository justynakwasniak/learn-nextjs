import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  console.log("Dostałem dane:", data);

  // Możesz tu zrobić np. zapis do bazy lub wysłanie maila
  // Na razie po prostu zwracamy sukces
  return NextResponse.json({ message: "Formularz odebrany pomyślnie!" });
}
