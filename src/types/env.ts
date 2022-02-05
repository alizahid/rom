export type EnvVar = {
  key: string
  value: string
}

export type EnvVarInput = {
  key: string
} & (
  | {
      value: string
    }
  | {
      generateValue: true
    }
)
