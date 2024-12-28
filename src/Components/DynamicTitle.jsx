const DynamicTitle = ({heading, subHeading}) => {
    return (
        <div className="text-center">
            <p className="text-yellow-600">{subHeading}</p>
            <h2 className="text-3xl border-y-2 w-72 mx-auto my-3 py-2">{heading}</h2>
        </div>
    );
};

export default DynamicTitle;