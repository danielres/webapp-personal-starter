import { ApolloError } from "apollo-server-micro"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { sdk } from "../../../sdk"
import { isEmail } from "../../../validators/isEmail"
import { messages } from "../../../validators/messages"
import { Check } from "../../Icons/Check"
import { InlineIcon } from "../../Icons/InlineIcon"
import { Plus } from "../../Icons/Plus"
import { Alert } from "../../ui/Alert"
import { Button } from "../../ui/Button"
import { Container } from "../../ui/Container"
import { ApolloErrors } from "../../ui/forms/ApolloErrors"
import { InputCheckbox } from "../../ui/forms/InputCheckbox"
import { InputText } from "../../ui/forms/InputText"
import { Stack } from "../../ui/Stack"

export function FormInviteByEmail() {
  const [formArray, setFormArray] = useState([true])
  const appendForm = () => setFormArray([...formArray, true])

  return (
    <Container variant="dialog">
      <Stack>
        {formArray.map((v, key) => (
          <IndividualFormInviteByEmail key={key} />
        ))}

        <Button
          onClick={appendForm}
          className="transition-colors bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none"
          variant="custom"
        >
          <InlineIcon size={30}>
            <Plus />
          </InlineIcon>
        </Button>
      </Stack>
    </Container>
  )
}

function IndividualFormInviteByEmail() {
  const formMethods = useForm()
  const [apolloErrors, setApolloErrors] = useState<ApolloError[]>()
  const [successVars, setsuccessVars] = useState<
    undefined | { [k: string]: string }
  >()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (vars: any) => {
    setIsLoading(true)
    try {
      await sdk.InviteByEmail(vars)
      setApolloErrors(undefined)
      setsuccessVars(vars)
    } catch ({ response }) {
      setApolloErrors(response.errors)
    } finally {
      setIsLoading(false)
    }
  }

  if (successVars)
    return (
      <Alert variant="success">
        <InlineIcon>
          <Check />
        </InlineIcon>{" "}
        Invitation sent to <b>{successVars?.email}</b>
      </Alert>
    )

  return (
    <div className="p-4 bg-gray-100 border border-gray-300 rounded-md xs">
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Stack spacing="sm">
            <ApolloErrors errors={apolloErrors} />

            <InputText
              name="email"
              placeholder="email"
              validate={(v) => isEmail(v) || messages.Email}
            />

            <div className="flex justify-between">
              <div>
                <label>
                  <InputCheckbox name="isSuperUser" />
                  <span className="ml-2">Superuser</span>
                </label>
              </div>

              {isLoading ? (
                <span className="animate-fadein-slow">Sending...</span>
              ) : (
                <Button variant="secondary" type="submit">
                  Invite
                </Button>
              )}
            </div>
          </Stack>
        </form>
      </FormProvider>
    </div>
  )
}
