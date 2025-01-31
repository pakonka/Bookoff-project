const ResetPasswordForm = () => {
  return (
    <div className=" flex items-center justify-center my-[100px]">
      <div className="bg-[#f7f7f7] p-8 rounded-lg shadow-md w-[600px]">
        <h2 className="text-[35px] font-medium mb-4">Reset your password</h2>
        <p className="raleway text-black mb-6">
          We will send you an email to reset your password.
        </p>
        <form>
          <div className="raleway mb-4">
            <input
              type="email"
              required
              className="mt-1 block w-full border border-black  p-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Email"
            />
          </div>
          <div className="flex justify-center p-[20px]">
            <button className="raleway text-[16px] w-full md:w-[160px] h-[51px] border-[2px] bg-[#000] hover:border-black text-[#fff] transition duration-500 ease-in-out hover:bg-[#fff] hover:text-[#000] cursor-pointer">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
