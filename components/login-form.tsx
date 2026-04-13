"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface LoginFormProps extends Omit<
  React.ComponentProps<"form">,
  "onSubmit"
> {
  idLabel?: string;
  idPlaceholder?: string;
  title?: string;
  subtitle?: string;
  onSubmit?: (data: { id: string; password: string }) => void;
}

export function LoginForm({
  className,
  idLabel = "ID do usuário",
  idPlaceholder = "admin001, DL23001 ou PROF001",
  title = "Acesse sua conta",
  subtitle = "Informe seu ID e senha para entrar",
  onSubmit,
  ...props
}: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const id = formData.get("id") as string;
    const password = formData.get("password") as string;
    onSubmit?.({ id, password });
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-balance text-muted-foreground">
            {subtitle}
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="id">{idLabel}</FieldLabel>
          <Input
            id="id"
            name="id"
            type="text"
            placeholder={idPlaceholder}
            required
            className="bg-background border-input focus:ring-1 focus:ring-ring focus:ring-offset-1"
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu sua senha?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="bg-background border-input focus:ring-1 focus:ring-ring focus:ring-offset-1"
          />
        </Field>
        <Field>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
