import PropTypes from "prop-types";

const AsideItem = ({ titleStyle, title, itemStyle, wrapperStyle, children }) => {
 
  return (
    
    <div className={wrapperStyle}>
        <div className={itemStyle}>
            {children}
            <p className={titleStyle}>{title}</p>
        </div>
    </div>
  );
};

AsideItem.propTypes = {
    itemStyle: PropTypes.string,
    title: PropTypes.string,
    titleStyle: PropTypes.string,
    wrapperStyle: PropTypes.string,
}
export default AsideItem;