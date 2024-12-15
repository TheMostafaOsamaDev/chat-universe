export class ApiError {
  private static _message: string;
  private static _statusCode: number;

  static generate(
    error: unknown,
    alt?: string
  ): { message: string; status: number } {
    // First, ensure error is an object and not null:
    if (typeof error === "object" && error !== null) {
      // Now assert the shape that we expect. For example:
      interface ErrorShape {
        response?: {
          data?: {
            message?: string | string[];
          };
          status?: number;
        };
        message?: string;
      }

      const err = error as ErrorShape; // type assertion

      if (typeof err.response?.data?.message === "string") {
        this._message = err.response.data.message;
      } else if (Array.isArray(err.response?.data?.message)) {
        this._message = err.response.data.message[0];
      } else if (err.response?.data?.message) {
        // Convert whatever it is to string
        this._message = String(err.response.data.message);
      } else if (err.message) {
        this._message = err.message;
      } else if (alt) {
        this._message = alt;
      } else {
        this._message = "An error occurred";
      }

      this._statusCode = err.response?.status ?? 500;
    } else {
      // If error isn't an object, handle that scenario
      this._message = alt || "An error occurred";
      this._statusCode = 500;
    }

    // Remove trailing "Read more at" if exists
    if (this._message.toLowerCase().includes("read more at")) {
      this._message = this._message.split("Read more at")[0];
    }

    return {
      message: this._message,
      status: this._statusCode,
    };
  }
}
