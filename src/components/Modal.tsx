import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from './Button'

export interface ModalAction {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  disabled?: boolean
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  actions?: ModalAction[]
}

export function Modal({ isOpen, onClose, title, children, actions }: ModalProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-background px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-background text-text-secondary hover:text-text focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div>
                  <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-text">
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">{children}</div>
                </div>
                {actions && actions.length > 0 && (
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    {actions.map((action, index) => (
                      <Button
                        key={index}
                        onClick={action.onClick}
                        variant={action.variant}
                        disabled={action.disabled}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
} 