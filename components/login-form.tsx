import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Seja bem-vindo de volta</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Insira seu dados para teres acesso a tua conta
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">ID Estudantil</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="DL23..."
            required
            className="bg-background border-input focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
            type="password"
            required
            className="bg-background border-input focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </Field>
        <Field>
          <Button type="submit">Entrar</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
