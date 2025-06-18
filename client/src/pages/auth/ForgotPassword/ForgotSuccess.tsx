const ForgotEmailSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <div className="text-green-500 text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Check Your Email</h2>
        <p className="text-gray-600 mb-4">
          A verification link has been sent to your registered email address. Please check your inbox and follow the link to verify your account.
        </p>
        <p className="text-sm text-gray-500">Didn't receive the email? Check your spam folder or <a href="#" className="text-blue-600 underline">resend</a>.</p>
      </div>
    </div>
  );
};

export default ForgotEmailSuccess;
