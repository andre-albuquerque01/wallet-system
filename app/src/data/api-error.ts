export default function ApiError(error: unknown): {
    ok: false
    error: string
  } {
    if (error instanceof Error) {
      return { error: error.message, ok: false }
    }
    return { error: 'Error', ok: false }
  }