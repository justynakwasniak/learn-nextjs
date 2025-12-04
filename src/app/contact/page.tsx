"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ✅ SCHEMA walidacji
const contactFormSchema = z.object({
  name: z.string().min(2, "Imię musi mieć minimum 2 znaki"),
  email: z.string().email("To nie wygląda jak poprawny email"),
  message: z.string().min(5, "Wiadomość powinna mieć minimum 5 znaków"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const sendContactForm = async (data: ContactFormData) => {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Błąd przy wysyłaniu formularza");
  return res.json();
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, // 👈 tu są błędy walidacji
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: sendContactForm,
    onSuccess: () => {
      setSuccessMessage("Formularz wysłany pomyślnie!");
      setErrorMessage(null);
      reset();
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        setErrorMessage("Coś poszło nie tak: " + error.message);
      } else {
        setErrorMessage("Coś poszło nie tak");
      }
      setSuccessMessage(null);
    },
  });

  const isLoading = mutation.status === "pending";

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="max-w-md mx-auto p-5 bg-gray-800 rounded-xl border border-gray-700 shadow-lg space-y-5"
    >
      <h2 className="text-2xl font-bold text-center text-green-400">Contact 🚀</h2>

      {/* NAME */}
      <div>
        <input
          {...register("name")}
          placeholder="Imię"
          className="w-full p-2 bg-gray-900 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {errors.name && (
          <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* EMAIL */}
      <div>
        <input
          {...register("email")}
          placeholder="Email"
          type="email"
          className="w-full p-2 bg-gray-900 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* MESSAGE */}
      <div>
        <textarea
          {...register("message")}
          placeholder="Wiadomość"
          className="w-full p-2 bg-gray-900 text-white border border-gray-600 rounded-xl h-28 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {errors.message && (
          <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      {successMessage && (
        <p className="text-green-400 text-center font-medium">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-400 text-center font-medium">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-500 text-black font-semibold py-2 rounded-xl disabled:bg-gray-600 disabled:text-gray-300 transition hover:bg-green-400"
      >
        {isLoading ? "Wysyłam..." : "Wyślij"}
      </button>
    </form>
  );
}
