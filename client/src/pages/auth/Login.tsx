import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/services/authService.ts/authApi";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUserStore } from "@/zustand/userStore";

import FirebaseAuthComponent from "@/components/auth/FirebaseAuthComponent";
import LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  //zustand
  const loginDispatch = useUserStore((state) => state.login);


  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: login,
    onSuccess: async (response) => {
      toast.success(response.message);
      loginDispatch(response.data);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    loginMutation(formData);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 rounded-lg flex flex-col gap-7 w-96">
        <h1 className="text-3xl font-semibold text-center text-[#E63946]">
          Login
        </h1>
        <form action="" className="flex flex-col gap-9">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input onChange={handleChange} className="w-full" name="email" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={handleChange}
              type="password"
              className="w-full"
              name="password"
            />
            <p
              onClick={() => navigate("/forgotPassword/sendMail")}
              className="text-muted-foreground text-xs font-medium hover:underline cursor-pointer"
            >
              Forgot password?
            </p>
          </div>
        </form>
        <Button
          disabled={isPending}
          onClick={handleSubmit}
          className="bg-[#E63946] text-white py-2 rounded-lg hover:bg-[#dc2f3c] transition-colors"
        >
          {isPending ? <LoadingSpinnerComponent /> : "Login"}
        </Button>
        <FirebaseAuthComponent />
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#E63946] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
