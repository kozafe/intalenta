import { useEffect, useState } from "react";
import { useQueryHook } from "../../components/api";
import { Book, DetailsItem, DetailsModal } from "./details";
import { LoadingScreen } from "./loading";
import { Modal } from "../../components/modal";
import { EditDetailsComponent } from "./edit";

export const ListPage = () => {
  const { data, loading, setData } = useQueryHook<Book[]>({
    url: "/books",
  });

  const [page, setPage] = useState(1);

  const paginate = 5;

  const maxPage = Math.ceil(data.length / paginate);

  const [favorites, setFavorites] = useState<number[]>([]);

  const [selectedId, setSelectedId] = useState<boolean | number>(false);

  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const books = data.slice((page - 1) * paginate, page * paginate);

  useEffect(() => {
    const favorites: number[] =
      JSON.parse(localStorage.getItem("favorites") || "") || [];

    setFavorites(favorites);
  }, []);

  const setsFavorite = (result: number[]) => {
    localStorage.setItem("favorites", JSON.stringify(result));

    setFavorites(result);
  };

  const handleClick = (type: string, value?: number | Book) => {
    const isOpenDetails = type === "details";
    const isNext = type === "next";
    const isPrevious = type === "prev";
    const isDelete = type === "delete";
    const isEdit = type === "edit";
    const isAdd = type === "add";
    const isOpenAddModal = type === "openAdd";

    if (isOpenAddModal) return setIsOpenAdd(true);

    if (isEdit || isAdd) {
      if (value === undefined || typeof value === "number") return;

      if (isAdd) {
        setIsOpenAdd(false);
        return setData((prev) => [value, ...prev]);
      }

      const result = data.map((item) => {
        if (item.id !== value.id) return item;
        return value;
      });

      setData(result);

      return;
    }

    if (isDelete) {
      setSelectedId(false);
      const result = favorites.filter((id) => id !== selectedId);

      setsFavorite(result);

      return setData((prev) => prev.filter(({ id }) => id !== selectedId));
    }

    if (isNext) return setPage((p) => p + 1);

    if (isPrevious) return setPage((p) => p - 1);

    if (typeof value !== "number") return;

    if (isOpenDetails) return setSelectedId(value);

    const decider = () => {
      const isAdd = !favorites.find((id) => id === value);

      if (isAdd) return [...favorites, value];

      return favorites.filter((id) => id !== value);
    };

    const result = decider();

    setsFavorite(result);
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="m-20">
      <Modal isOpen={isOpenAdd} toggle={() => setIsOpenAdd(false)}>
        <EditDetailsComponent
          onSubmit={(val: Book) => handleClick("add", val)}
        />
      </Modal>
      <DetailsModal
        toggle={() => setSelectedId(false)}
        id={selectedId}
        onClick={handleClick}
      />
      <div className="favorites-container">
        {!!favorites.length && (
          <div>
            <h1>Favorites</h1>
            <div className="d-flex  ">
              {favorites.map((id, index) => {
                const obj = data.find(({ id: itemId }) => id === itemId);

                if (!obj) return null;

                const { cover } = obj;

                return (
                  <div
                    key={index}
                    className="mr"
                    onClick={() => handleClick("favorite", id)}
                  >
                    <img src={cover} style={{ maxHeight: 100 }} alt="Cover" />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="books-container">
        <h1>
          List of books{" "}
          <button className="add-button" onClick={() => handleClick("openAdd")}>
            add book
          </button>
        </h1>
        {books.map((item, index) => {
          const { id } = item;

          const isFavorite = favorites.find((itemId) => itemId === id);

          return (
            <DetailsItem
              key={index}
              item={item}
              button={
                !!id && (
                  <div className="d-flex">
                    <button
                      className="mr"
                      onClick={() => handleClick("details", id)}
                    >
                      Details
                    </button>
                    <button onClick={() => handleClick("favorite", id)}>
                      {isFavorite ? "Delete favorite" : "Add to favorite"}
                    </button>
                  </div>
                )
              }
            />
          );
        })}
      </div>

      <div className="button-container">
        {page !== 1 && (
          <button className="mr" onClick={() => handleClick("prev")}>
            previous
          </button>
        )}
        {maxPage !== page && (
          <button onClick={() => handleClick("next")}>next</button>
        )}
      </div>
    </div>
  );
};
