import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  static genericMessage = 'An unknown error has occurred.';

  getErrorMessage(error: unknown, defaultMessage?: string): string {
    // Check for nested error(s)
    if (error != null && typeof error == 'object') {
      // error.error
      if (Object.hasOwn(error, 'error')) {
        const innerErr = (error as { error: unknown }).error;
        if (innerErr != null) error = innerErr;
      }
      // error.errors
      else if (Object.hasOwn(error, 'errors')) {
        const errArr = (error as { errors: unknown }).errors;
        if (Array.isArray(errArr) && errArr.length > 0 && errArr[0] != null) error = errArr[0];
      }
      // error.message (not sure if this is ever an object - it was in the old error.service so I copied it here)
      else if (Object.hasOwn(error, 'message')) {
        const errMsg = (error as { message: unknown }).message;
        if (errMsg != null && typeof errMsg == 'object') error = errMsg;
      }
    }

    if (typeof error === 'string') return error;
    if (error == null || typeof error != 'object') return defaultMessage ?? ErrorService.genericMessage;

    // Look for a specific value; if we have it, return it as a string
    const findValue = (key: string): string | false => {
      // Do we have the value?
      if (Object.hasOwn(error, key))
        // If so, get the value and coerce it into a string
        return (error as Record<string, unknown>)[key] + '';
      return false;
    };

    // Use || operator to find the first truthy value; skip falses and ''
    const errValue =
      findValue('ExceptionMessage') ||
      findValue('Message') ||
      findValue('message') ||
      findValue('title') ||
      findValue('body') ||
      findValue('msg') ||
      findValue('statusText') ||
      defaultMessage ||
      ErrorService.genericMessage;

    return errValue;
  }

  // #endregion

  RetrieveServiceError(error: unknown): ErrorInfo | null {
    if (error == null) return null;

    const msg = this.getErrorMessage(error);

    // We're already an HttpErrorResponse - Return this
    if (error instanceof HttpErrorResponse) {
      return { ErrorMessage: msg, ErrorObject: error };
    }

    // Otherwise, we have to make a new HttpErrorResponse to return
    const errObject = new HttpErrorResponse({
      error,
      status: 500, // Generic server error
      statusText: msg,
    });

    return { ErrorMessage: msg, ErrorObject: errObject };
  }
}

export type ErrorInfo = {
  ErrorObject: HttpErrorResponse;
  ErrorMessage: string;
};
