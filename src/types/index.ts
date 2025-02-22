type TUser = {
  name: string
  email: string
  id: string
}

type TFormState = {
  message: string | null
  status?: number
}

export type { TFormState, TUser }
