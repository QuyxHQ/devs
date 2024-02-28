import {
  TbArrowRight,
  TbChevronLeft,
  TbChevronRight,
  TbExternalLink,
  TbPencil,
  TbSearch,
} from "react-icons/tb";
import { copyToClipboard, formatDate } from "../../../../utils/helpers";
import { useEffect, useRef, useState } from "react";
import { AnchorLink, Loader, Modal } from "../../..";
import { AppEditModal, RegisterApp } from ".";
import { VscCopy, VscEye, VscEyeClosed } from "react-icons/vsc";
import debounce from "lodash.debounce";
import { api } from "../../../../utils/class/api.class";

const RenderTable = ({
  limit,
  setLimit,
  page,
  setPage,
  total,
  data,
}: RenderTableProps<QuyxApp>) => {
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [isMasked, setIsMasked] = useState<boolean>(true);
  const [modalBody, setModalBody] = useState<React.JSX.Element>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayBox, setDisplayBox] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<QuyxApp[]>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const displayBoxRef = useRef<any>(null);

  async function searchApps(q: string) {
    setIsLoading(true);
    const { data } = await api.searchApps({ q, page: 1, limit: 50 });
    setSearchResult(data);
    setIsLoading(false);
  }

  const debouncedFetchData = debounce(searchApps, 1500);

  useEffect(() => {
    if (searchTerm && searchTerm.length > 0) {
      setIsLoading(true);
      debouncedFetchData(searchTerm);
    } else setSearchResult(undefined);
  }, [searchTerm]);

  useEffect(() => {
    function handleClickOutside(e: any) {
      if (displayBoxRef.current && !displayBoxRef.current.contains(e.target)) {
        setDisplayBox(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <Modal
        setDisplayModal={setDisplayModal}
        displayModal={displayModal}
        children={modalBody}
      />

      <div className="pt-2">
        <div className="d-flex align-items-center justify-content-between mb-4 table-top">
          <div className="position-relative search" ref={displayBoxRef}>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setDisplayBox(true)}
              value={searchTerm}
            />
            <TbSearch className="position-absolute" />

            <div
              className={`search-results position-absolute ${
                displayBox ? "d-block" : "d-none"
              }`}
            >
              {isLoading ? (
                <div className="d-flex align-items-center justify-content-center py-5 my-2 my-md-4">
                  <Loader fill="#aaa" width={20} height={20} />
                </div>
              ) : !searchResult ? (
                <div className="d-flex align-items-center justify-content-center py-5 my-2 my-md-4">
                  <p className="txt">Start typing....</p>
                </div>
              ) : searchResult.length == 0 ? (
                <div className="d-flex align-items-center justify-content-center py-5 my-2 my-md-4">
                  <p className="txt">
                    no app found for <strong>`{searchTerm}`</strong>
                  </p>
                </div>
              ) : (
                <ul>
                  {searchResult.map((item, index) => (
                    <li key={`app-search-result-${index}`}>
                      <AnchorLink to={`/app/${item._id}`}>
                        <span>{item.name}</span>
                        <div>
                          <TbArrowRight />
                        </div>
                      </AnchorLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <button
            className="btn"
            onClick={() => {
              setModalBody(<RegisterApp close={setDisplayModal} />);
              setDisplayModal(true);
            }}
          >
            + new app
          </button>
        </div>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>App name</th>
                <th>Client ID</th>
                <th>Api Key</th>
                <th>Created on</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={`table-row-${index}-${item._id}`}>
                  <td>
                    <AnchorLink to={`/app/${item._id}`}>
                      {page == 1 ? 1 + index : limit * (page - 1) + index + 1}
                    </AnchorLink>
                  </td>

                  <td className="title-case">
                    <AnchorLink to={`/app/${item._id}`}>{item.name}</AnchorLink>
                  </td>

                  <td>
                    <div className="masked-field">
                      <p>{isMasked ? "*".repeat(item.clientID.length) : item.clientID}</p>

                      <div>
                        {isMasked ? (
                          <VscEye onClick={() => setIsMasked(!isMasked)} />
                        ) : (
                          <VscEyeClosed onClick={() => setIsMasked(!isMasked)} />
                        )}

                        <VscCopy onClick={() => copyToClipboard(item.clientID)} />
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="masked-field">
                      <p>{isMasked ? "*".repeat(item.apiKey.length) : item.apiKey}</p>

                      <div>
                        {isMasked ? (
                          <VscEye onClick={() => setIsMasked(!isMasked)} />
                        ) : (
                          <VscEyeClosed onClick={() => setIsMasked(!isMasked)} />
                        )}

                        <VscCopy onClick={() => copyToClipboard(item.clientID)} />
                      </div>
                    </div>
                  </td>

                  <td>{formatDate(item.createdAt)}</td>

                  <td>
                    <div className="d-flex align-items-center" style={{ gap: "1.5rem" }}>
                      <button
                        onClick={() => {
                          setModalBody(
                            <AppEditModal close={setDisplayModal} data={item} />
                          );
                          setDisplayModal(true);
                        }}
                      >
                        <TbPencil />
                        <span>App Details</span>
                      </button>

                      <AnchorLink to={`/app/${item._id}`}>
                        <TbExternalLink strokeWidth={1.5} stroke="blue" size={22} />
                      </AnchorLink>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex align-items-center justify-content-end pagination">
          <div className="d-flex align-items-center first">
            <p>Rows per page:</p>

            <select onChange={(e) => setLimit(parseInt(e.target.value))} value={limit}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>

          <div className="paging">
            {page == 1 ? page : (page - 1) * limit + 1}&nbsp;-&nbsp;
            {total < limit ? total : page == 1 ? limit : limit * (page - 1) + limit}
            &nbsp;of&nbsp;{total}
          </div>

          <div className="d-flex align-items-center chevron">
            <div
              className={page <= 1 ? "disabled" : ""}
              onClick={page <= 1 ? () => {} : () => setPage(page - 1)}
            >
              <TbChevronLeft />
            </div>

            <div
              className={page >= Math.ceil(total / limit) ? "disabled" : ""}
              onClick={
                page >= Math.ceil(total / limit) ? () => {} : () => setPage(page + 1)
              }
            >
              <TbChevronRight />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RenderTable;
