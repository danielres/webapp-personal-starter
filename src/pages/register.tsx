import React, { useState } from "react"
import { FormSignup } from "../components/forms/FormSignup"
import { FormSignupSuccess } from "../components/forms/FormSignupSuccess"
import { Card } from "../components/ui/Card"
import { Container } from "../components/ui/Container"

export default function Register() {
  const [isSignupSuccess, setIsSignupSuccess] = useState(false)

  return (
    <Container variant="dialog">
      <Card className="animate-fadein-slow">
        {isSignupSuccess ? (
          <FormSignupSuccess />
        ) : (
          <FormSignup onSuccess={() => setIsSignupSuccess(true)} />
        )}
      </Card>
    </Container>
  )
}
