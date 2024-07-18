import React from 'react'

// to create a real time editor 
import { Editor } from '@tinymce/tinymce-react'

// to pass on the control from here to parent(like forward ref)
import { Controller } from 'react-hook-form'

export default function RTE({name, control, label, defaultValue=""}) {
  return (
    <div className='w-full'>

        {/* if any label exists then show it */}
      {label && <label className='inline-block mb-1 pl-1'>
        {label}
        </label>}

{/* the onChange function is passed to the TinyMCE Editor component through the onEditorChange prop. This ensures that any change in the editor's content updates the form state managed by react-hook-form. */}

        {/* this passes the control to parent */}
        <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => (
        // creates an editor
        <Editor
        initialValue={defaultValue}
        init={{
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
    )}
    />
    </div>
  )
}
