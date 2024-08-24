import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import axios from "axios";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const onSubmit = (data) => {
    const userInfo = {
      name: data.name,
      pin: data.pin,
      mobile_number: data.number,
      email: data.email,
      status: "pending",
      balance: 40,
      role: "user",
    };
    axios.post("http://localhost:5000/registration", userInfo)
    .then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Registration Complete",
          showConfirmButton: false,
          timer: 1300,
        });
        console.log(data.data.insertedId, "iiiddd");
      } 
      else {
        console.log(res.data.message, "this is message");
      }
    });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="your name"
                {...register("name")}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="number"
                {...register("number", { maxLength: 11, minLength: 11 })}
                placeholder="Number"
                className="input input-bordered"
                required
              />
              {errors.number ? (
                <div className="label">
                  <span className="label-text-alt text-red-500">
                    Number must be 11 digit
                  </span>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">PIN - 5 digit</span>
              </label>
              <input
                type="number"
                {...register("pin", { maxLength: 4, minLength: 4 })}
                placeholder="PIN"
                className="input input-bordered"
                required
              />
              {errors.pin ? (
                <div className="label">
                  <span className="label-text-alt text-red-500">
                    Pin must be 4 digit
                  </span>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
