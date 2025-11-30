"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

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
  const { register, handleSubmit, reset } = useForm<ContactFormData>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: sendContactForm,
    onSuccess: () => {
      setSuccessMessage("Formularz wysłany pomyślnie!");
      setErrorMessage(null);
      reset(); // czyści formularz po wysłaniu
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
      className="max-w-md mx-auto p-4 border rounded-md space-y-4"
    >
      <div>
        <input
          {...register("name", { required: "Imię jest wymagane" })}
          placeholder="Imię"
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <input
          {...register("email", { required: "Email jest wymagany" })}
          placeholder="Email"
          type="email"
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <textarea
          {...register("message", { required: "Wiadomość jest wymagana" })}
          placeholder="Wiadomość"
          className="w-full p-2 border rounded"
        />
      </div>

      {successMessage && (
        <p className="text-green-600 font-medium">{successMessage}</p>
      )}
      {errorMessage && <p className="text-red-600 font-medium">{errorMessage}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
      >
        {isLoading ? "Wysyłam..." : "Wyślij"}
      </button>
    </form>
  );
}
