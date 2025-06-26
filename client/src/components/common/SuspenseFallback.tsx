
const SuspenseFallback = () => {
  return (
    <div className="h-[100vh] w-full flex flex-col justify-center items-center text-center">
        <div className="flex flex-col gap-6 justify-center items-center w-[40%] relative z-1">
        <h1 className="font-bold text-3xl">Meta <span className="text-red-500">Mentor</span></h1>
        <span className="suspenseLoader"></span>
        <p className="text-muted-foreground z-1 relative">Loading your experience..</p>
        </div>
        <div className='h-50 w-[30%] absolute bg-[rgba(255,64,64,0.37)] left-0 top-0 blur-[200px] z-0'></div>
        <div className='h-50 w-[30%] absolute bg-[rgba(255,64,64,0.37)] bottom-0 right-0 blur-[200px] z-0'></div>
    </div>
  )
}

export default SuspenseFallback
