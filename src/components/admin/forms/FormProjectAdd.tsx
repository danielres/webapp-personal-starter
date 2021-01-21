import { ApolloError } from "apollo-server-micro"
import Link from "next/link"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { sdk } from "../../../../sdk"
import { getPath } from "../../../getPath"
import { isProjectName } from "../../../validators/isProjectName"
import { messages } from "../../../validators/messages"
import { Check } from "../../Icons/Check"
import { InlineIcon } from "../../Icons/InlineIcon"
import { Plus } from "../../Icons/Plus"
import { Alert } from "../../ui/Alert"
import { Button } from "../../ui/Button"
import { Container } from "../../ui/Container"
import { ApolloErrors } from "../../ui/forms/ApolloErrors"
import { InputText } from "../../ui/forms/InputText"
import { Stack } from "../../ui/Stack"

export function FormProjectAdd() {
  const [formArray, setFormArray] = useState([true])
  const appendForm = () => setFormArray([...formArray, true])

  return (
    <Container variant="dialog">
      <Stack>
        {formArray.map((v, key) => (
          <IndividualFormAddProject key={key} />
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

function IndividualFormAddProject() {
  const formMethods = useForm()
  const [apolloErrors, setApolloErrors] = useState<ApolloError[]>()
  const [successVars, setsuccessVars] = useState<{
    id: number
    name: string
  } | null>()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (vars: any) => {
    setIsLoading(true)
    try {
      const { projectCreate: result } = await sdk.ProjectCreate(vars)
      setApolloErrors(undefined)
      setsuccessVars(result)
    } catch ({ response }) {
      setApolloErrors(response.errors)
    } finally {
      setIsLoading(false)
    }
  }

  if (successVars)
    return (
      <Alert variant="success">
        <div className="flex justify-between">
          <div>
            <InlineIcon>
              <Check />
            </InlineIcon>{" "}
            Project <b>{successVars?.name}</b> created
          </div>
          <div>
            <Link href={getPath.admin.projects.edit(successVars?.id)}>
              Edit
            </Link>
          </div>
        </div>
      </Alert>
    )

  return (
    <div className="p-4 bg-gray-100 border border-gray-300 rounded-md xs">
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Stack spacing="sm">
            <ApolloErrors errors={apolloErrors} />

            <InputText
              name="name"
              placeholder="name"
              validate={(v) => isProjectName(v) || messages.ProjectName}
            />

            <div className="flex justify-between">
              {isLoading ? (
                <span className="animate-fadein-slow">Sending...</span>
              ) : (
                <Button variant="secondary" type="submit">
                  Create project
                </Button>
              )}
            </div>
          </Stack>
        </form>
      </FormProvider>
    </div>
  )
}
