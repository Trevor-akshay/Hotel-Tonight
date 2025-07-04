import useAxios from '../../hooks/useAxios';
import { Link, useNavigate } from 'react-router-dom';
import './propertyList.css';

const PropertyList = () => {
	const url = "https://hotel-tonight.onrender.com/hotels/gettypes";
	const { data, loading, error } = useAxios(url);

	const contentArray = [
		{
			id: 1,
			title: 'Hotels',
			image:
				'https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=',
		},
		{
			id: 2,
			title: 'Apartments',
			image:
				'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg',
		},
		{
			id: 3,
			title: 'Resorts',
			image:
				'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg',
		},
		{
			id: 4,
			title: 'Cabins',
			image:
				'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg',
		},
		{
			id: 5,
			title: 'Villas',
			image:
				'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg',
		},
	];
	return (
		<div className="pList">
			{loading ? (
				'please wait'
			) : (
				<>
					{contentArray.map((content) => {
						return (
								<div key={content.id} className="pListItem">
									<img src={content.image} alt="logo" className="pListImg" />
									<div className="pListTitles">
										<h1>{content.title}</h1>
										<h2>
											{data[content.title]} {content.title}
										</h2>
									</div>
								</div>
						);
					})}
				</>
			)}
		</div>
	);
};

export default PropertyList;
