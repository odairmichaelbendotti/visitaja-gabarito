"use client";

import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/app/components/Button";
import FormField from "@/app/components/FormField";
import { useUserStore, EXAMPLE_USER } from "@/lib/store/user";

/**
 * Only interactive piece of the signup screen — the rest of
 * app/criar-conta/page.tsx stays static.
 */
export default function SignupForm() {
  const router = useRouter();
  const login = useUserStore((state) => state.login);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // No backend yet: creating an account already logs in with the example user.
    // Whoever already has a plan goes to the dashboard overview, whoever
    // doesn't goes to onboarding.
    login(EXAMPLE_USER);
    const plan = useUserStore.getState().user?.plan ?? null;
    router.push(plan ? "/visao-geral" : "/onboarding");
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
      <FormField
        id="name"
        label="Nome completo"
        type="text"
        placeholder="Maria Silva"
        helperText=""
        required
      />
      <FormField
        id="email"
        label="E-mail profissional"
        type="email"
        placeholder="seu@email.com"
        helperText=""
        required
      />
      <FormField
        id="password"
        label="Senha"
        type="password"
        placeholder="Crie uma senha"
        helperText=""
        required
      />
      <FormField
        id="confirm-password"
        label="Confirmar senha"
        type="password"
        placeholder="Repita a senha"
        helperText=""
        required
      />

      <p className="text-center text-body-s text-content-subtle">
        Ao criar sua conta, você concorda com os{" "}
        <Link
          href="#"
          className="text-content-brand transition-colors hover:text-brand-hover"
        >
          Termos de Uso
        </Link>{" "}
        e a{" "}
        <Link
          href="#"
          className="text-content-brand transition-colors hover:text-brand-hover"
        >
          Política de Privacidade
        </Link>
        .
      </p>

      <Button type="submit" variant="primary" className="w-full">
        Continuar
      </Button>
    </form>
  );
}
