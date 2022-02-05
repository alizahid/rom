export type EnvVar = {
  id: string
  key: string
  value: string
}

export type EnvVarInput = {
  id: string
  key: string
} & (
  | {
      value: string
    }
  | {
      generateValue: true
    }
)
