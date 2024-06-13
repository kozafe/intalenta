import React, { useEffect, ReactNode, useState } from "react";
import { Modal, ModalProps } from "../../components/modal";
import { useQueryHook } from "../../components/api";
import { LoadingScreen } from "./loading";
import { EditDetailsComponent } from "./edit";

export interface Book {
  author: string;
  cover: string;
  description: string;
  id: number;
  publicationDate: string;
  title: string;
}

interface DetailModal extends ModalProps {
  id: boolean | number;
  onClick: (type: string, value?: any) => void;
}

export const DetailsItem = ({
  item,
  button,
}: {
  item: Book;
  button?: ReactNode;
}) => {
  const { cover, author, description, publicationDate, title } = item;

  const date = new Date(publicationDate);

  const monthName = date.toLocaleString("default", { month: "long" });

  const fullDate = `${date.getDate()} ${monthName} ${date.getFullYear()} `;

  return (
    <div className="detail-item">
      <img src={cover} alt="Cover" />
      <div className="content">
        <div>
          <p>{author}</p>
          <p>{title}</p>
          <p>{description}</p>
          {fullDate}
        </div>
        {button}
      </div>
    </div>
  );
};

export const DetailsModal: React.FC<DetailModal> = ({
  toggle,
  id,
  onClick,
}) => {
  const { data, refetch, loading, setData } = useQueryHook<Book>({
    url: `/books/${id}`,
    woInit: true,
    defaultValue: {},
  });

  useEffect(() => {
    if (!id) return;
    refetch();
  }, [id, refetch]);

  const [isEdit, setIsEdit] = useState(false);

  const component = () => {
    if (loading)
      return <LoadingScreen style={{ height: "100%", width: "100%" }} />;

    if (isEdit)
      return (
        <EditDetailsComponent
          defaultValues={data}
          onSubmit={(val: Book) => {
            setIsEdit(false);
            onClick("edit", val);
            setData(val);
          }}
        />
      );

    return (
      <div className="modal-container">
        <DetailsItem item={data} />
        <button onClick={() => onClick("delete")}>delete</button>
        <button onClick={() => setIsEdit(true)} style={{ marginTop: 8 }}>
          edit
        </button>
      </div>
    );
  };

  return (
    <Modal
      isOpen={!!id}
      toggle={() => {
        toggle();
        setIsEdit(false);
      }}
    >
      {component()}
    </Modal>
  );
};
