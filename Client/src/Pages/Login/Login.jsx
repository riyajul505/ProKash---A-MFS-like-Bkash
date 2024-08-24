import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { TbBrandProducthunt } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axiosPublic
      .get(`/login?number=${data.number}&pin=${data.pin}`)
      .then((res) => {
        if (res.data.message) {
          Swal.fire({
            title: `${res.data.message}`,
            position: "top-right",
            icon: "warning",
            showConfirmButton: false,
          });
        } else {
          axiosPublic.post("/create-token", { _id: res.data }).then(() => {
            navigate("/home");
            Swal.fire({
              title: `Logged In`,
              position: "top-right",
              icon: "success",
              showConfirmButton: false,
            });
          });
        }
      });
  };
  return (
    <div>
      <Card
        shadow={false}
        className="md:px-24 md:py-14 py-8 border border-gray-300 flex items-center justify-center h-[100vh]"
      >
        <CardHeader shadow={false} floated={false} className="text-center">
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-4 !text-3xl lg:text-4xl"
          >
            <span className="flex flex-row justify-center items-center">
              <TbBrandProducthunt className="text-4xl text-green-400" />
              rokash
            </span>{" "}
            Login
          </Typography>
          <Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
            Enjoy quick and send money, cash-out to your accounts on various
            numbers with our platforms.
          </Typography>
        </CardHeader>
        <CardBody className="pt-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 md:mt-12"
          >
            <div>
              <label htmlFor="email">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="block font-medium mb-2"
                >
                  Number
                </Typography>
              </label>
              <input
                id="number"
                color="gray"
                {...register("number", { required: true })}
                maxLength={11}
                type="number"
                placeholder="01871111324"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div>
              <label htmlFor="email">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="block font-medium mb-2"
                >
                  Pin
                </Typography>
              </label>
              <Input
                id="email"
                color="gray"
                size="lg"
                type="number"
                {...register("pin", { required: true })}
                inputMode="numeric"
                name="pin"
                placeholder="1234"
                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <Button size="lg" color="gray" fullWidth type="submit">
              Continue
            </Button>

            <Typography
              variant="small"
              className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600"
            >
              Are you new here?{" "}
              <a href="/registration" className="text-gray-900">
                Register
              </a>{" "}
            </Typography>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
