//
//  BridgeResources.swift
//  WMe-Swift
//
//  Created by Akshay Ramaswamy on 8/22/16.
//  Copyright © 2016 Akshay Ramaswamy. All rights reserved.
//

import UIKit
import WebKit

class BridgeResources: UIViewController{
    
  
    @IBOutlet var containerView: UIView! = nil
    var webView: WKWebView?
    
    override func loadView() {
        super.loadView()
        
        self.webView = WKWebView()
        self.view = self.webView!
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let url = NSURL(string:"https://stanfordbridge.wordpress.com")
        let req = NSURLRequest(URL:url!)
        self.webView!.loadRequest(req)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }

}
