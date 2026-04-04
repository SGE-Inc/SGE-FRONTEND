import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Insira seu email abaixo para criar sua conta
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Nome Completo</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            required
            className="bg-background border-input focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-background border-input focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input
            id="password"
            type="password"
            required
            className="bg-background border-input focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <FieldDescription>
            A senha deve conter pelo menos 8 caracteres, incluindo letras e
            números.
          </FieldDescription>
        </Field>
        <Field>
          <Button type="submit">Criar Conta</Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Já tem uma conta? <a href="#">Entrar</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
