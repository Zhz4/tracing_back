import { useKeepAliveContext } from "keepalive-for-react";

const Tabs = () => {
  const { getCacheNodes } = useKeepAliveContext();
  const nodes = getCacheNodes();

  return (
    <div className="w-full h-10 bg-red-500">
      {nodes.map((node) => (
        <div key={node.cacheKey}>{node.cacheKey}</div>
      ))}
    </div>
  );
};

export default Tabs;
