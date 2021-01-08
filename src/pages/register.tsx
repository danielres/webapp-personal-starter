import React, { useState } from "react"
import { Card } from "src/components/ui/Card"
import { FormSignup } from "../components/forms/FormSignup"
import { FormSignupSuccess } from "../components/forms/FormSignupSuccess"

export default function Register() {
  const [isSignupSuccess, setIsSignupSuccess] = useState(false)

  return (
    <div className="max-w-lg mx-auto mt-8">
      <Card className="animate-fadein-slow">
        {isSignupSuccess ? (
          <FormSignupSuccess />
        ) : (
          <FormSignup onSuccess={() => setIsSignupSuccess(true)} />
        )}
      </Card>
    </div>
  )
}
