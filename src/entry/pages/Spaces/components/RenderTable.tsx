import {
    TbArrowRight,
    TbChevronLeft,
    TbChevronRight,
    TbExternalLink,
    TbPencil,
    TbSearch,
} from 'react-icons/tb';
import { formatDate } from '../../../../utils/helpers';
import { useEffect, useRef, useState } from 'react';
import { AnchorLink, Loader, Modal } from '../../..';
import { SpaceEditModal, CreateSpace } from '.';
import debounce from 'lodash.debounce';
import { api } from '../../../../utils/class/api.class';

const RenderTable = ({ limit, setLimit, page, setPage, total, data }: RenderTableProps<Space>) => {
    const [displayModal, setDisplayModal] = useState<boolean>(false);
    const [modalBody, setModalBody] = useState<React.JSX.Element>();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [displayBox, setDisplayBox] = useState<boolean>(false);
    const [searchResult, setSearchResult] = useState<Space[]>();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const displayBoxRef = useRef<any>(null);

    async function searchForSpace(q: string) {
        setIsLoading(true);

        const { data } = await api.searchSpace({ q, page: 1, limit: 50 });
        setSearchResult(data);
        setIsLoading(false);
    }

    const debouncedFetchData = debounce(searchForSpace, 1500);

    useEffect(() => {
        if (!searchTerm) return setSearchResult(undefined);

        setIsLoading(true);
        debouncedFetchData(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        function handleClickOutside(e: any) {
            if (displayBoxRef.current && !displayBoxRef.current.contains(e.target)) {
                setDisplayBox(false);
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <>
            <Modal
                setDisplayModal={setDisplayModal}
                displayModal={displayModal}
                children={modalBody}
                size="md"
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
                                displayBox ? 'd-block' : 'd-none'
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
                                            <AnchorLink to={`/space/${item._id}`}>
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
                            setModalBody(<CreateSpace close={setDisplayModal} />);
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
                                <th>DID</th>
                                <th>Created on</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((item, index) => (
                                <tr key={`table-row-${index}-${item._id}`}>
                                    <td>
                                        <AnchorLink to={`/space/${item.did}`}>
                                            {page == 1 ? 1 + index : limit * (page - 1) + index + 1}
                                        </AnchorLink>
                                    </td>

                                    <td className="title-case">
                                        <AnchorLink to={`/space/${item.did}`}>
                                            {item.name}
                                        </AnchorLink>
                                    </td>

                                    <td>
                                        <AnchorLink to={`/space/${item.did}`}>
                                            {item.did}
                                        </AnchorLink>
                                    </td>

                                    <td>{formatDate(item.createdAt)}</td>

                                    <td>
                                        <div
                                            className="d-flex align-items-center"
                                            style={{ gap: '1.5rem' }}
                                        >
                                            <button
                                                onClick={() => {
                                                    setModalBody(
                                                        <SpaceEditModal
                                                            close={setDisplayModal}
                                                            data={item}
                                                        />
                                                    );
                                                    setDisplayModal(true);
                                                }}
                                            >
                                                <TbPencil />
                                                <span>App Details</span>
                                            </button>

                                            <AnchorLink to={`/space/${item.did}`}>
                                                <TbExternalLink
                                                    strokeWidth={1.5}
                                                    stroke="blue"
                                                    size={22}
                                                />
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
                            className={page <= 1 ? 'disabled' : ''}
                            onClick={page <= 1 ? () => {} : () => setPage(page - 1)}
                        >
                            <TbChevronLeft />
                        </div>

                        <div
                            className={page >= Math.ceil(total / limit) ? 'disabled' : ''}
                            onClick={
                                page >= Math.ceil(total / limit)
                                    ? () => {}
                                    : () => setPage(page + 1)
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
