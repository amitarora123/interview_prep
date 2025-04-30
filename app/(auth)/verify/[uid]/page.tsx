import AuthForm from "@/components/AuthForm"

const VerifyAccount = async ({ params }:  RouteParams) => {
    
  const {uid} = await params;


  return (
    <div>
        <AuthForm type="verify" uid={uid}/>
    </div>
  )
}

export default VerifyAccount