import Pagination from 'react-js-pagination';

const definePagination = (props) => {
    return (
        props.total > 0 && (
            <Pagination
                innerClass={`pagination pagination-sm justify-content-${props.position} mb-0 mt-3`}
                activePage={props.currentPage}
                activeClass="page-item active"
                itemCountPerPage={props.perPage}
                totalItemsCount={props.total}
                onChange={props.onChange}
                itemClass="page-item"
                linkClass="page-link"
            />
        )
    );
};

export default definePagination;
