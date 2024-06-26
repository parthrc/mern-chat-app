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
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useLogin from "../../hooks/useLogin";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { loginApi } = useLogin();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await loginApi({
        email: values.email,
        password: values.password,
      });

      if (res.status === "success") {
        login(res.data);
        toast.success("User login success");
        navigate("/");
      } else {
        toast.error(res.msg || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      form.reset();
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen items-center bg-slate-200">
      <div className=" bg-white  my-auto shadow-md rounded-sm">
        <div className="bg-black text-white w-full uppercase font-bold text-center p-2 text-2xl lg:text-4xl rounded-sm">
          Login
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4 lg:gap-y-8 px-6 py-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="lg:text-2xl">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter email"
                      {...field}
                      className="lg:text-2xl"
                    />
                  </FormControl>
                  <FormMessage className="lg:text-2xl" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="lg:text-2xl">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="enter password"
                      {...field}
                      className="lg:text-2xl"
                    />
                  </FormControl>
                  <FormMessage className="lg:text-2xl" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-fit mt-4 mx-auto">
              Submit
            </Button>
            <span className="mx-auto">
              Not registered?{" "}
              <Link to="/register" className="underline hover:text-blue-500">
                register here
              </Link>
            </span>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
