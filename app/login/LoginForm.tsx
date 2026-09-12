"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/app/components/Button";
import FormField from "@/app/components/FormField";
import {
  useUserStore,
  EXAMPLE_USER,
  EXAMPLE_CREDENTIALS,
} from "@/lib/store/user";

/**
 * Only interactive piece of the login screen — that's why it's its own
 * "use client", the rest of app/login/page.tsx stays static.
 */
export default function LoginForm() {
  const router = useRouter();
  const login = useUserStore((state) => state.login);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "")
      .trim()
      .toLowerCase();
    const password = String(formData.get("password") ?? "");

    const credentialsValid =
      email === EXAMPLE_CREDENTIALS.email &&
      password === EXAMPLE_CREDENTIALS.password;

    if (!credentialsValid) {
      setError("E-mail ou senha incorretos.");
      return;
    }

    setError("");
    // No backend yet: correct credentials "log in" with the example user.
    login(EXAMPLE_USER);

    // If this came from a redirect (e.g. tried to open /assinatura/escolher-plano
    // while logged out), go back exactly there. With no requested
    // destination: whoever already has a plan goes to the dashboard
    // overview, whoever still doesn't goes to onboarding.
    const requested = new URLSearchParams(window.location.search).get(
      "redirecionar",
    );
    const plan = useUserStore.getState().user?.plan ?? null;
    router.push(requested || (plan ? "/visao-geral" : "/onboarding"));
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
      <FormField
        id="email"
        name="email"
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        helperText=""
        required
      />
      <FormField
        id="password"
        name="password"
        label="Senha"
        type="password"
        placeholder="Sua senha"
        helperText=""
        error={error || undefined}
        required
      />
      <Link
        href="#"
        className="self-end text-body-s text-content-brand transition-colors hover:text-brand-hover"
      >
        Esqueceu a senha?
      </Link>
      <Button type="submit" variant="primary" className="w-full">
        Entrar
      </Button>
    </form>
  );
}
