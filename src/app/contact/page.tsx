"use client"; // bo będziemy używać hooków

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// 1. Definiujemy schemat walidacji
const contactFormSchema = z.object({
  name: z.string().min(2, "Imię jest wymagane"),
  email: z.string().email("Nieprawidłowy email"),
  message: z.string().min(5, "Wiadomość jest za krótka"),
});

// 2. Typ formularza z Zod
type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  // 3. Konfiguracja React Hook Form z Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  // 4. Funkcja obsługi submit
  const onSubmit = (data: ContactFormData) => {
    console.log("Dane z formularza:", data);
    alert("Wysłano formularz!");
    reset();
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Formularz kontaktowy</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1">Imię:</label>
          <input
            type="text"
            {...register("name")}
            className="border p-2 w-full rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            {...register("email")}
            className="border p-2 w-full rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Wiadomość:</label>
          <textarea
            {...register("message")}
            className="border p-2 w-full rounded"
          />
          {errors.message && <p className="text-red-500">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Wyślij
        </button>
      </form>
    </div>
  );
}
