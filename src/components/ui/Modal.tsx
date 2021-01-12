import React, { useEffect } from "react"
import { createPortal } from "react-dom"
import { H2 } from "./H2"
import { Stack } from "./Stack"
import { IconCircle } from "../Icons/IconCircle"

type ModapProps = {
  footer?: React.ReactNode
  children: React.ReactNode
  icon?: React.ReactNode
  title?: string
}

export function Modal({ children, footer, icon, title }: ModapProps) {
  return (
    <ModalPortal>
      <div className="fixed inset-0 z-50 animate-fadein-fast">
        <div className="px-8 pt-4">
          <ModalBackdrop />

          <div
            aria-modal="true"
            className="block max-w-2xl mx-auto my-8 overflow-hidden transform bg-white rounded-lg shadow-md"
            role="dialog"
          >
            <Stack>
              <div className="px-8 pt-5 sm:p-6 ">
                <div className="flex flex-col gap-3 md:gap-6 sm:flex-row">
                  {icon && (
                    <div className="mx-auto">
                      <IconCircle variant="success">{icon}</IconCircle>
                    </div>
                  )}

                  <div className="pt-2 text-gray-500">
                    {title && (
                      <H2 className="text-center text-gray-900 md:text-left">
                        {title}
                      </H2>
                    )}
                    {children}
                  </div>
                </div>
              </div>

              {footer && <div className="px-4 py-3 bg-gray-50">{footer}</div>}
            </Stack>
          </div>
        </div>
      </div>
    </ModalPortal>
  )
}

function ModalBackdrop() {
  return (
    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
      <div className="absolute inset-0 bg-gray-500 opacity-60"></div>
    </div>
  )
}

type ModalPortalProps = {
  children: React.ReactNode
}

function ModalPortal({ children }: ModalPortalProps) {
  const mount = document.getElementById("modal-root") as any
  const el = document.createElement("div")

  useEffect(() => {
    mount.appendChild(el)
    return () => mount.removeChild(el)
  }, [el, mount])

  return createPortal(children, el)
}
