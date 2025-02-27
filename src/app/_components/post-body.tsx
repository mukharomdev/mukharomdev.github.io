import markdownStyles from "./markdown-styles.module.css";


type Props = {
  content: string;
};

export function PostBody({ content }: Props) {

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className= {`${markdownStyles["markdown"]} prose prose-code ` }
        dangerouslySetInnerHTML={{ __html: content }}
      /> 
    </div>
  );
}
