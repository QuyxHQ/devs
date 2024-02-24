import {
  TbChevronLeft,
  TbChevronRight,
  TbExternalLink,
  TbPencil,
  TbSearch,
} from "react-icons/tb";
import { copyToClipboard, formatDate } from "../../../../utils/helpers";
import React, { useState } from "react";
import { AnchorLink, Modal } from "../../..";
import { AppEditModal, RegisterApp } from ".";
import { VscCopy, VscEye, VscEyeClosed } from "react-icons/vsc";

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

  return (
    <>
      <Modal
        setDisplayModal={setDisplayModal}
        displayModal={displayModal}
        children={modalBody}
      />

      <div className="pt-2">
        <div className="d-flex align-items-center justify-content-between mb-4 table-top">
          <div className="position-relative search">
            <input type="text" placeholder="Search..." />
            <TbSearch className="position-absolute" />
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
                      {page == 1 ? 1 + index : limit * page + index}
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
            {page == 1 ? page : limit * page}&nbsp;-&nbsp;
            {total < limit ? total : page == 1 ? limit : limit * page + limit}
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

export default React.memo(RenderTable);
