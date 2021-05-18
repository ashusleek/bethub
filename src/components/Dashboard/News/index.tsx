import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import TimeAgo from 'timeago-react';
import { Card, Row } from '@themesberg/react-bootstrap';
// import { getDate } from 'utils/helper';
// import ExpandableRowTable from 'components/Common/Table/ExpandableRowTable';

const News = ({ getNewsAction, news }) => {
  useEffect(() => {
    getNewsAction({ limit: 5, sortKey: 'createdAt', sortValue: -1, page: 1, append: true });
  }, [getNewsAction]);

  const fetchMoreData = () => {
    getNewsAction({ limit: 5, sortKey: 'createdAt', sortValue: -1, page: news.page + 1, append: true });
  };

  // const columns = [
  //   {
  //     name: 'Title',
  //     sortable: true,
  //     cell: row => (
  //       <div>
  //         <div style={{ fontWeight: 700 }}>{row.title}</div>
  //         {getDate(row.updatedAt)}
  //       </div>
  //     )
  //   },
  //   {
  //     name: 'Puublished On',
  //     selector: 'createdAt',
  //     sortable: true,
  //     right: true
  //   }
  // ];

  return (
    <>
      <Row className='justify-content-md-center py-4'>
        <InfiniteScroll dataLength={news.list} next={fetchMoreData} hasMore={news.list.length < news.total} loader={<h4>Loading...</h4>}>
          {news.list.map((n, index) => (
            <Card key={index} className='mb-3'>
              <Card.Header as='h5'>
                {n.title}
                <Card.Text className='mt-2 font-italic'>
                  Published : <TimeAgo datetime={new Date(n.createdAt)} />
                  {n.createdAt !== n.updatedAt && (
                    <>
                      &nbsp;&nbsp;&nbsp;&nbsp;Last Updated : <TimeAgo datetime={new Date(n.updatedAt)} />
                    </>
                  )}
                </Card.Text>
              </Card.Header>

              <Card.Body>
                <Card.Text>
                  <div dangerouslySetInnerHTML={{ __html: n.description }}></div>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </InfiniteScroll>
      </Row>
    </>
    // <ExpandableRowTable title='Relavent News' columns={columns} data={newsList} />
  );
};

export default News;
