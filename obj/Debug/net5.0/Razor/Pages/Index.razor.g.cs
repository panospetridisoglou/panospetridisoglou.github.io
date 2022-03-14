#pragma checksum "C:\Users\NEETShonen\Desktop\Portfolio\Client\Pages\Index.razor" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "ab0ff77cc0936e1d0ef5a77a4595bea79c84bb18"
// <auto-generated/>
#pragma warning disable 1591
namespace Portfolio.Client.Pages
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Components;
#nullable restore
#line 1 "C:\Users\NEETShonen\Desktop\Portfolio\Client\_Imports.razor"
using System.Net.Http;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\NEETShonen\Desktop\Portfolio\Client\_Imports.razor"
using System.Net.Http.Json;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "C:\Users\NEETShonen\Desktop\Portfolio\Client\_Imports.razor"
using Microsoft.AspNetCore.Components.Forms;

#line default
#line hidden
#nullable disable
#nullable restore
#line 4 "C:\Users\NEETShonen\Desktop\Portfolio\Client\_Imports.razor"
using Microsoft.AspNetCore.Components.Routing;

#line default
#line hidden
#nullable disable
#nullable restore
#line 5 "C:\Users\NEETShonen\Desktop\Portfolio\Client\_Imports.razor"
using Microsoft.AspNetCore.Components.Web;

#line default
#line hidden
#nullable disable
#nullable restore
#line 6 "C:\Users\NEETShonen\Desktop\Portfolio\Client\_Imports.razor"
using Microsoft.AspNetCore.Components.Web.Virtualization;

#line default
#line hidden
#nullable disable
#nullable restore
#line 7 "C:\Users\NEETShonen\Desktop\Portfolio\Client\_Imports.razor"
using Microsoft.AspNetCore.Components.WebAssembly.Http;

#line default
#line hidden
#nullable disable
#nullable restore
#line 8 "C:\Users\NEETShonen\Desktop\Portfolio\Client\_Imports.razor"
using Microsoft.JSInterop;

#line default
#line hidden
#nullable disable
#nullable restore
#line 9 "C:\Users\NEETShonen\Desktop\Portfolio\Client\_Imports.razor"
using Portfolio.Client;

#line default
#line hidden
#nullable disable
#nullable restore
#line 10 "C:\Users\NEETShonen\Desktop\Portfolio\Client\_Imports.razor"
using Portfolio.Client.Shared;

#line default
#line hidden
#nullable disable
    [Microsoft.AspNetCore.Components.RouteAttribute("/")]
    [Microsoft.AspNetCore.Components.RouteAttribute("/search")]
    public partial class Index : Microsoft.AspNetCore.Components.ComponentBase
    {
        #pragma warning disable 1998
        protected override void BuildRenderTree(Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder)
        {
#nullable restore
#line 6 "C:\Users\NEETShonen\Desktop\Portfolio\Client\Pages\Index.razor"
 foreach(var c in cardInfos)
            {
    

#line default
#line hidden
#nullable disable
#nullable restore
#line 8 "C:\Users\NEETShonen\Desktop\Portfolio\Client\Pages\Index.razor"
     if (c.Tags.Any(x => tags.Any(y=>y.Contains(x)||x.Contains(y)) || tags.Count() == 0))
                {

#line default
#line hidden
#nullable disable
            __builder.OpenComponent<Portfolio.Client.Components.Card>(0);
            __builder.AddAttribute(1, "Title", Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<System.String>(
#nullable restore
#line 10 "C:\Users\NEETShonen\Desktop\Portfolio\Client\Pages\Index.razor"
                                                               c.Title

#line default
#line hidden
#nullable disable
            ));
            __builder.AddAttribute(2, "Text", Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<System.String>(
#nullable restore
#line 10 "C:\Users\NEETShonen\Desktop\Portfolio\Client\Pages\Index.razor"
                                                                                 c.Text

#line default
#line hidden
#nullable disable
            ));
            __builder.AddAttribute(3, "Href", Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<System.String>(
#nullable restore
#line 10 "C:\Users\NEETShonen\Desktop\Portfolio\Client\Pages\Index.razor"
                                                                                                  c.Href

#line default
#line hidden
#nullable disable
            ));
            __builder.AddAttribute(4, "Tags", Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<System.Collections.Generic.List<System.String>>(
#nullable restore
#line 10 "C:\Users\NEETShonen\Desktop\Portfolio\Client\Pages\Index.razor"
                                                                                                                   c.Tags

#line default
#line hidden
#nullable disable
            ));
            __builder.AddAttribute(5, "Image", Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<System.String>(
#nullable restore
#line 10 "C:\Users\NEETShonen\Desktop\Portfolio\Client\Pages\Index.razor"
                                                                                                                                     c.Image

#line default
#line hidden
#nullable disable
            ));
            __builder.AddAttribute(6, "Date", Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<System.DateTime>(
#nullable restore
#line 10 "C:\Users\NEETShonen\Desktop\Portfolio\Client\Pages\Index.razor"
                                                                                                                                                       c.Date

#line default
#line hidden
#nullable disable
            ));
            __builder.CloseComponent();
#nullable restore
#line 11 "C:\Users\NEETShonen\Desktop\Portfolio\Client\Pages\Index.razor"
                }

#line default
#line hidden
#nullable disable
#nullable restore
#line 11 "C:\Users\NEETShonen\Desktop\Portfolio\Client\Pages\Index.razor"
                 
            }

#line default
#line hidden
#nullable disable
        }
        #pragma warning restore 1998
#nullable restore
#line 17 "C:\Users\NEETShonen\Desktop\Portfolio\Client\Pages\Index.razor"
      
    string tagsString = "";
    List<string> tags =new List<string>();
    List<Portfolio.Shared.CardInfo> cardInfos = new List<Portfolio.Shared.CardInfo>();

    protected  Task<String> GetStringFromGithub(string site)
    {

        return (new System.Net.Http.HttpClient()).GetStringAsync(site);
    }

    protected override async Task OnInitializedAsync()
    {
        string baseUri = NavManager.BaseUri;

        string allItems= await (new System.Net.Http.HttpClient()).GetStringAsync("https://api.github.com/repos/panospetridisoglou/Website-Pages/contents/");
        List<Portfolio.Shared.GithubFile> allCards = (List<Portfolio.Shared.GithubFile>)System.Text.Json.JsonSerializer.Deserialize(allItems, typeof(List<Portfolio.Shared.GithubFile>));
        var allCardsConfig = allCards.Where(x => x.name.Contains(".config")).ToList();
        foreach (var card in allCardsConfig)
        {
            var config = await GetStringFromGithub("https://raw.githubusercontent.com/panospetridisoglou/Website-Pages/main/" + card.name);
            Console.WriteLine(config);
            var configCard = (Portfolio.Shared.CardInfo)System.Text.Json.JsonSerializer.Deserialize(config, typeof(Portfolio.Shared.CardInfo));
            var md = await GetStringFromGithub("https://raw.githubusercontent.com/panospetridisoglou/Website-Pages/main/" + card.name.Replace(".config", ".md"));
            configCard.Text = md;
            cardInfos.Add(configCard);
        }
        /* cardInfos = new List<Portfolio.Shared.CardInfo>()
             {
             new Portfolio.Shared.CardInfo()
             {
                 Image = "/icon-512.png",
                 Title= "Energy Hub",
                 Tags=new List<string>(){ "WPF","C#","POSTGRES","APP" },
                 Href="energyhub",
                 Date=DateTime.Parse("2020-08-23"),
                 Text=await GetStringFromGithub("https://raw.githubusercontent.com/panospetridisoglou/Website-Pages/main/EnergyHub.md")

             },
             new Portfolio.Shared.CardInfo()
             {
                 Image = "/icon-512.png",
                 Title= "Update Checker",
                 Tags=new List<string>(){ "WPF","C#","POSTGRES","APP" },
                 Href="updatecheceker",
                 Date=DateTime.Parse("2019-10-15")
             },
             new Portfolio.Shared.CardInfo()
             {
                 Image = "/icon-512.png",
                 Title= "E Mailer",
                 Tags=new List<string>(){ "WPF","C#","APP" },
                 Href="emailer",
                 Date=DateTime.Parse("2020-12-07")
             },
             new Portfolio.Shared.CardInfo()
             {
                 Image = "/icon-512.png",
                 Title= "Mini Web CRM",
                 Tags=new List<string>(){ "BLAZOR","C#","NET. CORE","POSTGRES","APP" },
                 Href="miniwebcrm",
                 Date=DateTime.Parse("2021-11-01")
             }
             ,  new Portfolio.Shared.CardInfo()
 {
     Image = "/icon-512.png",
     Title= "KKingdom",
     Tags=new List<string>(){ "UNITY","C#","POSTGRES","GAME" },
     Href="kkingdom",
     Date=DateTime.Parse("2021-11-01")
 }
             ,  new Portfolio.Shared.CardInfo()
 {
     Image = "/icon-512.png",
     Title= "VR Shooter",
     Tags=new List<string>(){ "UNITY","C#","POSTGRES","VR","GAME" },
     Href="vrshooter",
     Date=DateTime.Parse("2021-11-01")
 }


             };
         try {
             Console.WriteLine(baseUri + "/pages/EnergyHub.md");
             Console.WriteLine(await (new System.Net.Http.HttpClient()).GetStringAsync(baseUri + "/pages/EnergyHub.md"));
         }
         catch(Exception ae)
         {
             Console.WriteLine(ae.Message + " " + ae.StackTrace + " ");
         }
        */
        GetQueryStringValues();
        NavManager.LocationChanged += HandleLocationChanged;
    }
    void HandleLocationChanged(object sender, LocationChangedEventArgs e)
    {
        GetQueryStringValues();
        StateHasChanged();
    }

    void  GetQueryStringValues()
    {
        if (NavManager.Uri.Contains("search"))
        {
            try
            {

                tagsString = NavManager.Uri;
                tagsString = tagsString.Split(new[] { "tags=" }, StringSplitOptions.None)[1];
                tags = tagsString.ToUpper().Split('&').ToList();
                tags.RemoveAll(x => x == "");
                if (tags.Count() == 0) {
                    new Exception();
                }
                StateHasChanged();
            }
            catch {
                tags = new List<string>();
                StateHasChanged();
            }
        }
        else
        {
            tags = new List<string>();
            StateHasChanged();
        }
    }



#line default
#line hidden
#nullable disable
        [global::Microsoft.AspNetCore.Components.InjectAttribute] private NavigationManager NavManager { get; set; }
    }
}
#pragma warning restore 1591
