declare module 'formidable' {
  export class IncomingForm {
    constructor(options?: any)
    parse(req: any, callback: (err: Error | null, fields: any, files: any) => void): void
  }
} 