export interface IModalText {
  type: string;
  text: string;
  emoji?: boolean;
}

export interface IHeaderBlock {
  type: string;
  text: IModalText;
}

export interface IInputBlockOptions {
  text: IModalText;
  value: string;
}

export interface IInputBlock {
  type: string;
  element: {
    type: string;
    placeholder: IModalText;
    action_id: string;
    options: IInputBlockOptions[];
  };
  label: IModalText;
  block_id: string;
}

export interface IModal {
  callback_id: string;
  type: string;
  title: IModalText;
  submit?: IModalText;
  close?: IModalText;
  blocks?: Array<IInputBlock | IHeaderBlock>;
}
