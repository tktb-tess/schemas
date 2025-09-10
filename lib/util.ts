import z from 'zod';

export type Result<T, E> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: E;
    };

const misc_err_brand = Symbol();

type MiscError<T = unknown> = {
  readonly name: string;
  readonly message: string;
  readonly cause?: T;
  readonly [misc_err_brand]: unknown;
};

const MiscError = {
  from: <T = unknown>(
    name: string = '',
    message: string = '',
    cause?: T
  ): MiscError<T> =>
    ({
      name,
      message,
      cause,
    } as MiscError<T>),
};

export { MiscError };

export const parseAndValidate = <T extends z.ZodType>(
  json: string,
  schema: T
): Result<z.infer<T>, z.ZodError<z.infer<T>> | MiscError> => {
  try {
    const r = schema.safeParse(JSON.parse(json));

    if (r.success) {
      return {
        success: true,
        data: r.data,
      };
    } else {
      return {
        success: false,
        error: r.error,
      };
    }
  } catch (e) {
    const error = (() => {
      if (e instanceof Error) {
        return MiscError.from(e.name, e.message, e.cause);
      } else {
        return MiscError.from('UnidentifiedError', 'unidentified error', e);
      }
    })();

    return {
      success: false,
      error,
    };
  }
};
