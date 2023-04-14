import { Col, Row, Card } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import Images from '../images/Images';
import { v4 } from 'uuid';
import MotionDefault from '../layouts/motions/MotionDefault';
const { Meta } = Card;

const MOCK_BLOG = [
  {
    image: Images.event1,
    text: "2012, the Dutch government's NICHE project invested in ALEPH software.",
  },
  {
    image: Images.event2,
    text: '2013-2014, ALEPH software was officially put into use, replacing Libol',
  },
  {
    image: Images.event3,
    text: ' 2018-2019,  started using the automatic loan and return system.',
  },
  {
    image: Images.event4,
    text: '2020, put DSPACE digital document management software into operation.',
  },
];

const AboutPage = () => {
  return (
    <MotionDefault className='flex flex-col gap-5 bg-white'>
      <Row gutter={12}>
        <Col md={12} xs={24}>
          <img src={Images.event1} className='h-full' alt='' />
        </Col>
        <Col md={12} xs={24}>
          <Paragraph className='p-10 flex items-center justify-center h-full relative'>
            Library has been receiving the investment attention of the
            University's Board of Directors, from the projects of Denmark, the
            Netherlands... The library is considered an efficient university
            library, with a significant position in the association of
            university libraries. All management and service activities have
            been computerized, equipped with modern and synchronous equipment,
            and are gradually being perfected to become an electronic/digital
            library.
          </Paragraph>
        </Col>
      </Row>
      <Row gutter={12}>
        {MOCK_BLOG.map((item) => (
          <Col key={v4()} xs={24} md={12} xl={6}>
            <Card
              hoverable
              cover={
                <img
                  src={item.image}
                  className='h-[200px] w-full object-cover'
                  alt=''
                />
              }
            >
              <Meta
                className='font-light p-1 cursor-pointer'
                description={item.text}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </MotionDefault>
  );
};

export default AboutPage;
