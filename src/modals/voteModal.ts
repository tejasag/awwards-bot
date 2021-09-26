import {
  IModal,
  IHeaderBlock,
  IInputBlock,
  IInputBlockOptions,
} from "../types/modal";

const voteModal = (messageTs: string): IModal => {
  let modal: IModal = {
    callback_id: `voteModal_${messageTs}`,
    type: "modal",
    title: {
      type: "plain_text",
      text: "Awwwards!!",
      emoji: true,
    },
    submit: {
      type: "plain_text",
      text: "Submit",
      emoji: true,
    },
    close: {
      type: "plain_text",
      text: "Cancel",
      emoji: true,
    },
    // blocks: [],
  };

  let modalBlocks: Array<IHeaderBlock | IInputBlock> = [];

  let categories = [
    "Creativity",
    "Usability",
    "Design",
    "Content",
    "Responsiveness",
  ];

  categories.forEach((n) => {
    let header: IHeaderBlock = {
      type: "header",
      text: {
        type: "plain_text",
        text: n,
        emoji: false,
      },
    };

    let inputOptions: IInputBlockOptions[] = ["1", "2", "3", "4", "5"].map(
      (n) => {
        return {
          text: {
            type: "plain_text",
            text: n,
            emoji: true,
          },
          value: n,
        };
      }
    );

    let input: IInputBlock = {
      type: "input",
      element: {
        type: "static_select",
        placeholder: {
          type: "plain_text",
          text: "Select a rating",
          emoji: true,
        },
        action_id: `choice`,
        options: inputOptions,
      },
      label: {
        type: "plain_text",
        text: n,
        emoji: true,
      },
      block_id: n.toLowerCase(),
    };

    // modalBlocks.push(header);
    modalBlocks.push(input);
  });

  modal.blocks = modalBlocks;

  return modal;
};

export default voteModal;
