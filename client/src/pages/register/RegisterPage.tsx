import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";

// form schema
const formSchema = z
  .object({
    firstName: z.string().min(3, { message: "First name is required" }),
    lastName: z.string(),
    email: z.string().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z.string().min(1, { message: "Password is required" }),
    gender: z.enum(["male", "female", "other"], {
      message: "Gender is required",
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const RegisterPage = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "male",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success(values.email);

    form.reset();
  }
  return (
    <div className="flex flex-col w-full min-h-screen items-center bg-slate-200">
      <div className=" bg-white  my-auto shadow-md rounded-sm">
        <div className="bg-black text-white w-full uppercase font-bold text-center p-2 text-2xl lg:text-4xl rounded-sm">
          Register
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4 lg:gap-y-8 px-6 py-8"
          >
            <div className="flex gap-x-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="lg:text-xl">First name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enter first name"
                        {...field}
                        className="lg:text-xl"
                      />
                    </FormControl>
                    <FormMessage className="lg:text-xl" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="lg:text-xl">Last name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enter last name"
                        {...field}
                        className="lg:text-xl"
                      />
                    </FormControl>
                    <FormMessage className="lg:text-xl" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="lg:text-xl">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter email"
                      {...field}
                      className="lg:text-xl"
                    />
                  </FormControl>
                  <FormMessage className="lg:text-xl" />
                </FormItem>
              )}
            />
            <div className="flex gap-x-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="lg:text-xl">Enter password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enter password"
                        {...field}
                        className="lg:text-xl"
                      />
                    </FormControl>
                    <FormMessage className="lg:text-2xl" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="lg:text-xl">
                      Confirm password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enter password again"
                        {...field}
                        className="lg:text-xl"
                      />
                    </FormControl>
                    <FormMessage className="lg:text-xl" />
                  </FormItem>
                )}
              />
            </div>
            {/* Radio group gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="lg:text-xl">Select gender:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal">Female</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="other" />
                        </FormControl>
                        <FormLabel className="font-normal">Other</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-fit mt-4 mx-auto">
              Register
            </Button>
            <span className="mx-auto">
              already registered?{" "}
              <Link to="/login" className="underline hover:text-blue-500">
                login here
              </Link>
            </span>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
